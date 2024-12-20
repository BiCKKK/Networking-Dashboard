# Network Controller Dashboard Frontend  

This repository contains the frontend for the Programmable Network Controller.

## Prerequisites  
- Access to the **Netlab VM**. Ensure that the VM is correctly set up and running before proceeding.  

## Getting Started  

Follow these steps to start the frontend server and interact with the dashboard:  

1. **Open a terminal window in the Netlab VM.**  
2. Navigate to the `Networking-Dashboard/frontend` directory:  
   ```bash
   cd Networking-Dashboard/frontend
3. Start the development server:
   npm run dev
4. Open a web browser and navigate to http://localhost:5173. You will see the Network Controller interface.


## Usage Instructions  

- **Start a Simulation:**  
  - Click the **Start Simulation** button to initialise the Mininet topology.  

- **Connect the Controller:**  
  - Click the **Connect Controller** button to link the controller with the network topology.  

- **Disconnect and Stop Simulation:**  
  - Before shutting down the frontend server or starting a new session, ensure you:  
    1. **Disconnect the Controller:** Use the **Disconnect Controller** button on the dashboard.  
    2. **Stop the Simulation:** Use the **Stop Simulation** button.  
  - Once the simulation is stopped, return to the terminal and type `q`, then press **Enter** to safely exit.  

## Important Notes  

- Always ensure the simulation is stopped and the controller is disconnected **before shutting down the frontend server** or starting a new session.  
- Failure to properly stop the simulation or disconnect the controller may result in unexpected errors or conflicts in subsequent sessions.  
