from mininet.net import Mininet
from mininet.node import Controller
from mininet.link import TCLink
from .ebpf_switch import eBPFEnabledSwitch

net = None

def start_mininet_topology():
    global net
    if net is None:
        net = Mininet(controller=Controller, link=TCLink, switch=eBPFEnabledSwitch)
        net.addController('c0')

        control_sw = net.addSwitch('s1')
        scada = net.addHost('h1')
        dps_gw = net.addSwitch('s2')
        ied1 = net.addHost('h2')
        ied2 = net.addHost('h3')

        net.addLink(scada, control_sw)
        net.addLink(control_sw, dps_gw)
        net.addLink(dps_gw, ied1)
        net.addLink(dps_gw, ied2)

        net.start()
        print("Mininet topology started!")

def stop_mininet_topology():
    global net
    if net is not None:
        net.stop()
        net=None