module.exports = function(RED) {
    function ServoNode(config) {
        var node = this;
        RED.nodes.createNode(this, config);
        let Hz = config.hz;
        let PulseMin = config.pulseMin;
        let PulseMax = config.pulseMax;
        let AngleMin = config.angleMin;
        let AngleMax = config.angleMax;
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
