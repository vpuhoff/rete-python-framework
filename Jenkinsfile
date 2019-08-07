

pipeline {
    agent any
    stages {
        stage('Test') {
            steps {
                sh 'echo "OK"'
            }
        }
        stage('Build base image') {
            steps {
                sh "sh build-base.sh"
            }
        }
        stage('Build app image') {
            steps {
                sh "sh build-app.sh"
            }
        }

    }
}