module.exports = function(RED) {
    function ServoNode(config) {
        var node = this;
        RED.nodes.createNode(this, config);
        let Hz = Number(config.hz);
        let PulseMin = Number(config.pulseMin);
        let PulseMax = Number(config.pulseMax);
        let AngleMin = Number(config.angleMin);
        let AngleMax = Number(config.angleMax);
        node.on('input', function(msg) {
            let cycle = 1 / Hz * 1000;
            console.log(cycle);
            let PulseWidth = PulseMax - PulseMin;
            console.log(PulseWidth);
            let AngleWidth = AngleMax - AngleMin;
            console.log(AngleWidth);
            msg.payload = Number(msg.payload) / AngleWidth * PulseWidth / cycle;
            console.log(msg.payload);
            node.send(msg);
        });
    }
    RED.nodes.registerType("mcu_servo", ServoNode);
}
