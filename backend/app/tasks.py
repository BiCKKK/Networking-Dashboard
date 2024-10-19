import time 
from random import randint, choice 
from datetime import datetime 
from .models import TrafficFlow, db 
from faker import Faker 
  
fake = Faker() 

def simulate_real_time_data(): 
    """Function to simulate real-time traffic data.""" 
    while True: 
        new_traffic_flow = TrafficFlow( 
            source_node=fake.hostname(), 
            destination_node=fake.hostname(), 
            protocol=choice(['TCP', 'UDP']), 
            packet_size=randint(64, 1500), 
            timestamp=datetime.now(), 
            latency=round(randint(1, 50) * 0.1, 2), 
            flow_status=choice(['Active', 'Closed']) 
        ) 

        try: 
            db.session.add(new_traffic_flow) 
            db.session.commit() 
            print("New traffic flow added.") 
        except Exception as e: 
            db.session.rollback() 
            print(f"Error adding real-time data: {e}") 
        # Sleep for 2 seconds to simulate new data periodically 
        time.sleep(2) 