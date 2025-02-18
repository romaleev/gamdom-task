group "default" {
  targets = ["frontend", "backend"]
}

target "frontend" {
  context = "."
  dockerfile = "./common/docker/Dockerfile.client"
  tags = ["gamdom-task-frontend:latest"]
}

target "backend" {
	context = "."
	dockerfile = "./common/docker/Dockerfile.server"
	tags = ["gamdom-task-backend:latest"]
}