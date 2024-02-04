import {Node} from "nodered";
let cache;

class ServoNode extends Node {
	#io; #cycle; #pulseWidth; #angleWidth; #pulseMin;

	onStart(config) {
		super.onStart(config);

		if (!globalThis.device?.io?.PWM)
			return void this.status({fill: "red", shape: "dot", text: "node-red:common.status.error"});

		cache ??= new Map;
		let io = cache.get(config.pin);
        this.#cycle = 1 / Number(config.hz) * 10 ** 3;
        this.#pulseWidth = Number(config.pulseMax) - Number(config.pulseMin);
        this.#angleWidth = Number(config.angleMax) - Number(config.angleMin);
		this.#pulseMin = Number(config.pulseMin);

		if (io) {
			this.#io = io;
		}
		else {
			try {
				const options = {
					pin: config.pin,
				};
				if (config.hz)
					options.hz = config.hz;
				this.#io = io = new device.io.PWM(options);
				cache.set(config.pin, io);
			}
			catch {
				this.status({fill: "red", shape: "dot", text: "node-red:common.status.error"});
			}
		}
	}
	onMessage(msg, done) {
        let ratio = (Number(msg.payload) / this.#angleWidth * this.#pulseWidth + this.#pulseMin) / this.#cycle;
		if (this.#io) {
			this.#io.write(ratio * ((1 << this.#io.resolution) - 1));
			this.status({fill:"green", shape:"dot", text: ratio.toString()});
		}
		done();
	}

	static type = "mcu_servo";
	static {
		RED.nodes.registerType(this.type, this);
	}
}
