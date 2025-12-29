from flask import Flask, request, send_from_directory, render_template
import smtplib
from email.mime.text import MIMEText
import os

# Inicializar Flask con rutas de templates y archivos estáticos
app = Flask(__name__, template_folder='templates', static_folder='.')

# Configura tus credenciales de Gmail
GMAIL_USER = 'julianricardomt@gmail.com'
GMAIL_PASSWORD = 'hsce oqxd unoy kdtp'  # Reemplaza por tu contraseña o App Password


# Ruta para servir la página principal con templates
@app.route('/')
def home():
    return render_template('index.html')

# Ruta para servir archivos estáticos (CSS, JS, imágenes, etc)
@app.route('/<path:filename>')
def static_files(filename):
    return send_from_directory(os.path.dirname(__file__), filename)

@app.route('/enviar-correo', methods=['POST'])
def enviar_correo():
    nombre = request.form.get('nombre')
    email = request.form.get('email')
    mensaje = request.form.get('mensaje')

    cuerpo = f"Nombre: {nombre}\nEmail: {email}\nMensaje: {mensaje}"
    msg = MIMEText(cuerpo)
    msg['Subject'] = 'Nuevo mensaje desde el formulario web'
    msg['From'] = GMAIL_USER
    msg['To'] = GMAIL_USER

    try:
        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
            server.login(GMAIL_USER, GMAIL_PASSWORD)
            server.sendmail(GMAIL_USER, GMAIL_USER, msg.as_string())
        return 'Correo enviado correctamente.'
    except Exception as e:
        return f'Error al enviar el correo: {e}'

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
