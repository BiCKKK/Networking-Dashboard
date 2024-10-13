from app import create_app, db
from app.sample_data import generate_sample_data

app = create_app()

with app.app_context():
    generate_sample_data()
