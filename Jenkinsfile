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
        stage('Stop and remove container') {
            steps {
                sh "docker stop ems-gui || true && docker rm ems-gui || true"
            }
        }
        // stage('Remove container') {
        //     steps {
        //         sh "docker rm \$(docker ps -a |grep ems-gui|cut -d ' ' -f 1)"
        //     }
        // }
        stage('Start container') {
            steps {
                sh "docker run --name ems-gui  -d -p 8000:8000  ems-gui:latest"
            }
        }
    }
}
