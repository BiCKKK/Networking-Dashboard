from .mininet_simulation import net

def install_function_on_node(node_id, function_type):
    node = net.getNodeByName(node_id) if net else None
    if node:
        print(f"Installing {function_type} on node {node_id}")
        return True
    return False