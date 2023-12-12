module.exports = function(RED) {
    function ServoNode(config) {
        RED.nodes.createNode(this, config);
		console.log(config)
    }
    RED.nodes.registerType("mcu_servo", ServoNode);
}
