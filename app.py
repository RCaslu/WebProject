from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

# Rota para a página de login
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        # Verificação das credenciais (substitua pela lógica real de autenticação)
        if username == 'usuario' and password == 'senha':
            return redirect(url_for('index'))  # Redireciona para a página principal após o login

    return render_template('login.html')

# Rota para a página principal
@app.route('/index')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
