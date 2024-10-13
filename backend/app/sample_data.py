from faker import Faker
from datetime import datetime, timedelta
import random
from . import db
from .models import (
    NetworkTopology, TrafficFlow, PacketInspection, AttackEvents,
    IDSAlerts, AnomalyDetection, Users, UserSessions,
    DNSLog, RemoteAccessLog, SSLLog, FileIntegrityLog, SyslogEvent
)

fake = Faker()

def generate_sample_data():
    # Clear existing data
    try:
        db.session.query(NetworkTopology).delete()
        db.session.query(TrafficFlow).delete()
        db.session.query(PacketInspection).delete()
        db.session.query(AttackEvents).delete()
        db.session.query(IDSAlerts).delete()
        db.session.query(AnomalyDetection).delete()
        db.session.query(Users).delete()
        db.session.query(UserSessions).delete()
        db.session.query(DNSLog).delete()
        db.session.query(RemoteAccessLog).delete()
        db.session.query(SSLLog).delete()
        db.session.query(FileIntegrityLog).delete()
        db.session.query(SyslogEvent).delete()
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        print(f"Error clearing existing data: {e}")
        return

    # Lists to hold all generated objects for batch insertion
    network_topology_data = []
    traffic_flow_data = []
    packet_inspection_data = []
    attack_events_data = []
    ids_alerts_data = []
    anomaly_detection_data = []
    users_data = []
    user_sessions_data = []
    dns_log_data = []
    remote_access_log_data = []
    ssl_log_data = []
    file_integrity_log_data = []
    syslog_event_data = []

    # Sample data for NetworkTopology
    for _ in range(100):
        topology = NetworkTopology(
            node_name=fake.hostname(),
            node_type=random.choice(['Switch', 'Router', 'Firewall', 'Host']),
            status=random.choice(['Active', 'Inactive']),
            location=fake.city(),
            connected_nodes=', '.join(random.sample([fake.hostname() for _ in range(100)], random.randint(1, 5)))
        )
        network_topology_data.append(topology)

    # Sample data for TrafficFlow
    for _ in range(200):
        traffic = TrafficFlow(
            source_node=fake.hostname(),
            destination_node=fake.hostname(),
            protocol=random.choice(['TCP', 'UDP', 'ICMP']),
            packet_size=random.randint(64, 1500),
            timestamp=fake.date_time_between(start_date='-30d', end_date='now'),
            latency=round(random.uniform(0.1, 50.0), 2),
            flow_status=random.choice(['Active', 'Closed'])
        )
        traffic_flow_data.append(traffic)

    # Sample data for PacketInspection
    for _ in range(150):
        packet = PacketInspection(
            source_ip=fake.ipv4(),
            destination_ip=fake.ipv4(),
            protocol=random.choice(['TCP', 'UDP', 'ICMP']),
            payload=fake.text(max_nb_chars=200),
            timestamp=fake.date_time_between(start_date='-30d', end_date='now')
        )
        packet_inspection_data.append(packet)

    # Sample data for AttackEvents
    for _ in range(50):
        attack = AttackEvents(
            attack_type=random.choice(['DoS', 'MITM', 'Ransomware', 'Phishing']),
            source_node=fake.hostname(),
            target_node=fake.hostname(),
            impact=random.choice(['Low', 'Medium', 'High', 'Critical']),
            timestamp=fake.date_time_between(start_date='-30d', end_date='now'),
            status=random.choice(['Detected', 'Mitigated', 'Ongoing'])
        )
        attack_events_data.append(attack)

    # Sample data for IDSAlerts
    for _ in range(70):
        ids_alert = IDSAlerts(
            alert_message=fake.sentence(),
            severity=random.choice(['Low', 'Medium', 'High']),
            related_attack=random.randint(1, 50),
            timestamp=fake.date_time_between(start_date='-30d', end_date='now')
        )
        ids_alerts_data.append(ids_alert)

    # Sample data for AnomalyDetection
    for _ in range(50):
        anomaly = AnomalyDetection(
            anomaly_type=random.choice(['Bandwidth Spike', 'Packet Drop', 'Latency Increase']),
            description=fake.sentence(),
            related_flow=random.randint(1, 200),
            timestamp=fake.date_time_between(start_date='-30d', end_date='now')
        )
        anomaly_detection_data.append(anomaly)

    # Sample data for Users
    for _ in range(10):
        user = Users(
            username=fake.user_name(),
            password_hash=fake.sha256(),
            role=random.choice(['Admin', 'User']),
            last_login=fake.date_time_between(start_date='-30d', end_date='now')
        )
        users_data.append(user)

    # Sample data for UserSessions
    for _ in range(20):
        session = UserSessions(
            user_id=random.randint(1, 10),
            login_time=fake.date_time_between(start_date='-30d', end_date='-1d'),
            logout_time=fake.date_time_between(start_date='-1d', end_date='now')
        )
        user_sessions_data.append(session)

    # Sample data for DNSLog
    for _ in range(30):
        dns_log = DNSLog(
            query_name=fake.domain_name(),
            query_type=random.choice(['A', 'AAAA', 'CNAME', 'MX']),
            response_code=random.choice(['NOERROR', 'NXDOMAIN', 'SERVFAIL']),
            source_ip=fake.ipv4(),
            destination_ip=fake.ipv4(),
            timestamp=fake.date_time_between(start_date='-30d', end_date='now')
        )
        dns_log_data.append(dns_log)

    # Sample data for RemoteAccessLog
    for _ in range(25):
        remote_access = RemoteAccessLog(
            user_name=fake.user_name(),
            source_ip=fake.ipv4(),
            destination_ip=fake.ipv4(),
            access_type=random.choice(['SSH', 'RDP']),
            access_result=random.choice(['Success', 'Failure']),
            timestamp=fake.date_time_between(start_date='-30d', end_date='now')
        )
        remote_access_log_data.append(remote_access)

    # Sample data for SSLLog
    for _ in range(20):
        ssl_log = SSLLog(
            source_ip=fake.ipv4(),
            destination_ip=fake.ipv4(),
            ssl_version=random.choice(['TLSv1.2', 'TLSv1.3']),
            cipher_suite=fake.sha1(),
            certificate_issuer=fake.company(),
            certificate_subject=fake.domain_name(),
            timestamp=fake.date_time_between(start_date='-30d', end_date='now')
        )
        ssl_log_data.append(ssl_log)

    # Sample data for FileIntegrityLog
    for _ in range(15):
        file_integrity = FileIntegrityLog(
            file_path=fake.file_path(depth=3),
            hash_before=fake.sha256(),
            hash_after=fake.sha256(),
            change_type=random.choice(['Modified', 'Deleted', 'Created']),
            timestamp=fake.date_time_between(start_date='-30d', end_date='now')
        )
        file_integrity_log_data.append(file_integrity)

    # Sample data for SyslogEvent
    for _ in range(30):
        syslog_event = SyslogEvent(
            severity=random.choice(['INFO', 'WARNING', 'ERROR', 'CRITICAL']),
            message=fake.sentence(nb_words=6),
            source=fake.hostname(),
            timestamp=fake.date_time_between(start_date='-30d', end_date='now')
        )
        syslog_event_data.append(syslog_event)

    # Commit all changes in one batch
    try:
        db.session.bulk_save_objects(network_topology_data)
        db.session.bulk_save_objects(traffic_flow_data)
        db.session.bulk_save_objects(packet_inspection_data)
        db.session.bulk_save_objects(attack_events_data)
        db.session.bulk_save_objects(ids_alerts_data)
        db.session.bulk_save_objects(anomaly_detection_data)
        db.session.bulk_save_objects(users_data)
        db.session.bulk_save_objects(user_sessions_data)
        db.session.bulk_save_objects(dns_log_data)
        db.session.bulk_save_objects(remote_access_log_data)
        db.session.bulk_save_objects(ssl_log_data)
        db.session.bulk_save_objects(file_integrity_log_data)
        db.session.bulk_save_objects(syslog_event_data)

        db.session.commit()
        print("Sample data generated successfully.")
    except Exception as e:
        db.session.rollback()
        print(f"Error committing sample data: {e}")
