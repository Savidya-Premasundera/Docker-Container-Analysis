from flask import Flask, jsonify
import subprocess

app = Flask(__name__)

def get_system_info():
    ip_address = subprocess.check_output("hostname -I", shell=True).decode().strip()
    processes = subprocess.check_output("ps -ax", shell=True).decode()
    disk_space = subprocess.check_output("df -h /", shell=True).decode()
    uptime = subprocess.check_output("cat /proc/uptime | awk '{print $1}'", shell=True).decode().strip()

    return {
        "ip_address": ip_address,
        "processes": processes,
        "disk_space": disk_space,
        "uptime": uptime
    }

@app.route('/')
def system_info():
    return jsonify(get_system_info())

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
