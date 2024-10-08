# Use Python
FROM python:3.10

# Set the working directory
WORKDIR /app

# Install dependencies
RUN pip install flask

# Get the application code
COPY . .

# Expose the port
EXPOSE 5000

# Start the application
CMD ["python", "Service2.py"]
