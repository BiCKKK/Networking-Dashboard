from mininet.net import Mininet
from mininet.node import Controller
from mininet.cli import CLI
from mininet.link import TCLink, Intf
from mininet.log import setLogLevel, info
import logging
from eBPFSwitch import eBPFSwitch, eBPFHost

logger = logging.getLogger(__name__)

def start_mininet_topology():
    """
    Initialises and starts the Mininet topology.
    """
    setLogLevel('info')
    logger.info("Starting Mininet smart grid simulation topology...")

    # Initialise Mininet with custom eBPF host and switch classes
    net = Mininet(controller=Controller, host=eBPFHost, switch=eBPFSwitch, link=TCLink)

    # Add Controller
    info("*** Adding controller\n")
    net.addController("c0")

    # Define switches with eBPFSwitch
    info("*** Adding switches\n")
    DSS1GW = net.addSwitch('DSS1GW', dpid=1)
    DSS2GW = net.addSwitch('DSS2GW', dpid=2)
    WANR1 = net.addSwitch('WANR1', dpid=3)
    WANR2 = net.addSwitch('WANR2', dpid=4)
    CONTROLSW = net.addSwitch('CONTROLSW', dpid=5)
    DPSGW = net.addSwitch('DPSGW', dpid=6)
    DPSRS = net.addSwitch('DPSRS', dpid=7)
    DPSHV = net.addSwitch('DPSHV', dpid=8)
    DPSMV = net.addSwitch('DPSMV', dpid=9)

    # Define hosts with eBPFHost
    info("*** Adding hosts\n")
    DSS1RTU = net.addHost('DSS1RTU', ip='1.1.1.1', mac='b4:b1:5a:00:00:06')
    DSS2RTU = net.addHost('DSS2RTU', ip='1.1.2.1', mac='b4:b1:5a:00:00:07')
    CONTROL = net.addHost('CONTROL', ip='1.1.10.10', mac='00:0c:f1:00:00:08')
    IED1 = net.addHost('IED1', ip='1.1.3.1', mac='b4:b1:5a:00:00:01')
    IED2 = net.addHost('IED2', ip='1.1.3.2', mac='b4:b1:5a:00:00:02')
    IED3 = net.addHost('IED3', ip='1.1.3.3', mac='30:B2:16:00:00:03')
    IED4 = net.addHost('IED4', ip='1.1.3.4', mac='30:B2:16:00:00:04')
    DPSHMI = net.addHost('DPSHMI', ip='1.1.3.10', mac='00:02:b3:00:00:05')
    IDS = net.addHost('IDS', ip='1.1.1.8', mac='00:00:0c:00:00:88')

    # Define links between devices
    info("*** Adding links\n")
    MBPS = {'bw': 10} # Link parameters
    net.addLink(WANR2, CONTROLSW)
    net.addLink(WANR1, CONTROLSW)
    net.addLink(CONTROLSW, CONTROL)
    net.addLink(WANR1, DSS1GW, cls=TCLink, **MBPS)
    net.addLink(WANR2, DSS2GW, cls=TCLink, **MBPS)
    net.addLink(DPSGW, CONTROLSW)
    net.addLink(DPSGW, DPSRS)
    net.addLink(DPSRS, DPSHV)
    net.addLink(DPSRS, DPSMV)
    net.addLink(IED1, DPSHV)
    net.addLink(IED2, DPSHV)
    net.addLink(IED3, DPSMV)
    net.addLink(IED4, DPSMV)
    net.addLink(DPSHMI, DPSRS)
    net.addLink(DSS1GW, IDS)
    net.addLink(DSS1GW, DSS1RTU)
    net.addLink(DSS2GW, DSS2RTU)

    # Optional: External Interface on DPSHV (if required for actual physical network integration)
    # Intf('enp0s8', node=DPSHV) # Attach external interface

    # Start the network
    info("*** Starting network\n")
    net.start()

    return net