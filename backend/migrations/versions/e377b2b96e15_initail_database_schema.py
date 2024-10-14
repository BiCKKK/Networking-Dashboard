"""initail database schema

Revision ID: e377b2b96e15
Revises: 
Create Date: 2024-10-14 14:55:49.446391

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e377b2b96e15'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('attack_events',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('attack_type', sa.String(length=50), nullable=False),
    sa.Column('source_node', sa.String(length=50), nullable=False),
    sa.Column('target_node', sa.String(length=50), nullable=False),
    sa.Column('impact', sa.String(length=100), nullable=True),
    sa.Column('timestamp', sa.DateTime(), nullable=True),
    sa.Column('status', sa.String(length=20), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('dns_logs',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('query_name', sa.String(length=100), nullable=False),
    sa.Column('query_type', sa.String(length=20), nullable=True),
    sa.Column('response_code', sa.String(length=10), nullable=True),
    sa.Column('source_ip', sa.String(length=50), nullable=True),
    sa.Column('destination_ip', sa.String(length=50), nullable=True),
    sa.Column('timestamp', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('file_integrity_logs',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('file_path', sa.String(length=200), nullable=False),
    sa.Column('hash_before', sa.String(length=64), nullable=True),
    sa.Column('hash_after', sa.String(length=64), nullable=True),
    sa.Column('change_type', sa.String(length=20), nullable=True),
    sa.Column('timestamp', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('network_topology',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('node_name', sa.String(length=50), nullable=False),
    sa.Column('node_type', sa.String(length=20), nullable=False),
    sa.Column('status', sa.String(length=10), nullable=False),
    sa.Column('location', sa.String(length=100), nullable=True),
    sa.Column('connected_nodes', sa.String(length=200), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('packet_inspection',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('source_ip', sa.String(length=50), nullable=False),
    sa.Column('destination_ip', sa.String(length=20), nullable=False),
    sa.Column('protocol', sa.String(length=10), nullable=True),
    sa.Column('payload', sa.Text(), nullable=True),
    sa.Column('timestamp', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('remote_access_logs',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_name', sa.String(length=50), nullable=False),
    sa.Column('source_ip', sa.String(length=50), nullable=True),
    sa.Column('destination_ip', sa.String(length=50), nullable=True),
    sa.Column('access_type', sa.String(length=20), nullable=True),
    sa.Column('access_result', sa.String(length=20), nullable=True),
    sa.Column('timestamp', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('ssl_logs',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('source_ip', sa.String(length=50), nullable=False),
    sa.Column('destination_ip', sa.String(length=50), nullable=False),
    sa.Column('ssl_version', sa.String(length=10), nullable=True),
    sa.Column('cipher_suite', sa.String(length=50), nullable=True),
    sa.Column('certificate_issuer', sa.String(length=100), nullable=True),
    sa.Column('certificate_subject', sa.String(length=100), nullable=True),
    sa.Column('timestamp', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('syslog_events',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('severity', sa.String(length=10), nullable=False),
    sa.Column('message', sa.String(length=255), nullable=False),
    sa.Column('source', sa.String(length=50), nullable=True),
    sa.Column('timestamp', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('traffic_flow',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('source_node', sa.String(length=50), nullable=False),
    sa.Column('destination_node', sa.String(length=50), nullable=False),
    sa.Column('protocol', sa.String(length=10), nullable=True),
    sa.Column('packet_size', sa.Integer(), nullable=True),
    sa.Column('timestamp', sa.DateTime(), nullable=True),
    sa.Column('latency', sa.Float(), nullable=True),
    sa.Column('flow_status', sa.String(length=20), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=50), nullable=False),
    sa.Column('password_hash', sa.String(length=128), nullable=False),
    sa.Column('role', sa.String(length=20), nullable=True),
    sa.Column('last_login', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('username')
    )
    op.create_table('anomaly_detection',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('anomaly_type', sa.String(length=50), nullable=False),
    sa.Column('description', sa.String(length=200), nullable=True),
    sa.Column('related_flow', sa.Integer(), nullable=True),
    sa.Column('timestamp', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['related_flow'], ['traffic_flow.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('ids_alerts',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('alert_message', sa.String(length=200), nullable=False),
    sa.Column('severity', sa.String(length=10), nullable=True),
    sa.Column('related_attack', sa.Integer(), nullable=True),
    sa.Column('timestamp', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['related_attack'], ['traffic_flow.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('user_sessions',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('login_time', sa.DateTime(), nullable=True),
    sa.Column('logout_time', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('user_sessions')
    op.drop_table('ids_alerts')
    op.drop_table('anomaly_detection')
    op.drop_table('users')
    op.drop_table('traffic_flow')
    op.drop_table('syslog_events')
    op.drop_table('ssl_logs')
    op.drop_table('remote_access_logs')
    op.drop_table('packet_inspection')
    op.drop_table('network_topology')
    op.drop_table('file_integrity_logs')
    op.drop_table('dns_logs')
    op.drop_table('attack_events')
    # ### end Alembic commands ###