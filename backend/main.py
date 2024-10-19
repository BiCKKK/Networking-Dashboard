from app import create_app, socketio
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = create_app()

if __name__ == '__main__':
    logger.info("Starting Flask application...")
    socketio.run(app, debug=True, host='0.0.0.0', port=5000)
