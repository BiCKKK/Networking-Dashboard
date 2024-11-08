from mininet_simulation import start_mininet_topology
import logging

logger = logging.getLogger(__name__)
net = None

def start_network():
    global net
    if net is None:
        logger.info("Starting Smart Grid Topology...")
        net = start_mininet_topology()
    else: 
        logger.warning("Smart grid topology is already running.")

def stop_network():
    global net
    if net is not None:
        logger.info("Stopping Smart Grid Topology...")
        net.stop()
        net = None
    else:
        logger.warning("No smart grid topology is currently running.")

def get_network_status():
    """Returns whether the network is running or not."""
    return "running" if net else "stopped"