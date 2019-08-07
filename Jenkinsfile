

pipeline {
    agent any
    stages {
        stage('Test') {
            steps {
                sh 'echo "OK"'
            }
        }
        stage('Build') {
            steps {
                sh "sh build-base.sh"
            }
        }

    }
}