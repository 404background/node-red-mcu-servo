module.exports = function(RED) {
    function ServoNode(config) {
        var node = this;
        RED.nodes.createNode(this, config);
        let Hz = Number(config.hz);
        let PulseMin = Number(config.pulseMin);
        let PulseMax = Number(config.pulseMax);
        let AngleMin = Number(config.angleMin);
        let AngleMax = Number(config.angleMax);
        let cycle = 1 / Hz;
        let PulseWidth = PulseMax-PulseMin;
        let AngleWidth = AngleMax-AngleMin;
        node.on('input', function(msg) {
            msg.payload = msg.payload / AngleWidth * PulseWidth / cycle;
            node.send(msg);
        });
    }
    RED.nodes.registerType("mcu_servo", ServoNode);
}
