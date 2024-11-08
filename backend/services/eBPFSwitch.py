from mininet.node import Switch, Host
import subprocess

class eBPFHost(Host):
    def config(self, **params):
        """Configures host to disable offloading for accurate packet processing."""
        super().config(**params)
        for offload in ["rx", "tx", "sg"]:
            self.cmd(f"/sbin/ethtool --offload {self.defaultIntf()} {offload} off")
    
class eBPFSwitch(Switch):
    def __init__(self, name, switch_path='softswitch', **kwargs):
        super().__init__(name, **kwargs)
        self.switch_path = switch_path

    def setup(cls):
        pass

    def start(self, controllers):
        self.proc = subprocess.Popen([self.switch_path] + [intf.name for intf in self.intfs.values() if not intf.IP()])

    def stop(self):
        if self.proc:
            self.proc.kill()