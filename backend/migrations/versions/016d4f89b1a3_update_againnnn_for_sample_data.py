"""update againnnn for sample data

Revision ID: 016d4f89b1a3
Revises: ea17db54a287
Create Date: 2024-10-20 15:28:14.968580

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '016d4f89b1a3'
down_revision = 'ea17db54a287'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('packet_inspection')
    op.drop_table('attack_events')
    op.drop_table('anomaly_detection')
    op.drop_table('ids_alerts')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('ids_alerts',
    sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('alert_message', sa.VARCHAR(length=200), autoincrement=False, nullable=False),
    sa.Column('severity', sa.VARCHAR(length=10), autoincrement=False, nullable=True),
    sa.Column('timestamp', postgresql.TIMESTAMP(), autoincrement=False, nullable=False),
    sa.Column('related_flow', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.PrimaryKeyConstraint('id', name='ids_alerts_pkey')
    )
    op.create_table('anomaly_detection',
    sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('anomaly_type', sa.VARCHAR(length=50), autoincrement=False, nullable=False),
    sa.Column('description', sa.VARCHAR(length=200), autoincrement=False, nullable=True),
    sa.Column('related_flow', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.Column('timestamp', postgresql.TIMESTAMP(), autoincrement=False, nullable=False),
    sa.PrimaryKeyConstraint('id', name='anomaly_detection_pkey')
    )
    op.create_table('attack_events',
    sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('attack_type', sa.VARCHAR(length=50), autoincrement=False, nullable=False),
    sa.Column('source_node', sa.VARCHAR(length=50), autoincrement=False, nullable=False),
    sa.Column('target_node', sa.VARCHAR(length=50), autoincrement=False, nullable=False),
    sa.Column('impact', sa.VARCHAR(length=100), autoincrement=False, nullable=True),
    sa.Column('timestamp', postgresql.TIMESTAMP(), autoincrement=False, nullable=False),
    sa.Column('status', sa.VARCHAR(length=20), autoincrement=False, nullable=True),
    sa.PrimaryKeyConstraint('id', name='attack_events_pkey')
    )
    op.create_table('packet_inspection',
    sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('source_ip', sa.VARCHAR(length=50), autoincrement=False, nullable=False),
    sa.Column('destination_ip', sa.VARCHAR(length=20), autoincrement=False, nullable=False),
    sa.Column('protocol', sa.VARCHAR(length=10), autoincrement=False, nullable=True),
    sa.Column('timestamp', postgresql.TIMESTAMP(), autoincrement=False, nullable=False),
    sa.Column('packet_size', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.PrimaryKeyConstraint('id', name='packet_inspection_pkey')
    )
    # ### end Alembic commands ###