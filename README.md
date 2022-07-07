#  A starter MEAN stack project with Docker

[//]: # (### Reference Documentation)

[//]: # (For further reference, please consider the following sections:)

[//]: # ()
[//]: # (### Guides)

[//]: # (The following guides illustrate how to use some features concretely:)


### Docker Commands
`docker-compose -p mean docker up --build -d`


If you want to run 4 containers with a load balancer such as NGINX

`docker-compose -f 'docker-compose.nginx.yml' up --build`
