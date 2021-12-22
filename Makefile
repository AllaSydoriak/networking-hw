run:
	docker run -d -p 8080:8080 --rm --name nodeApp networking-hw
stop:
	docker stop nodeApp
build:
	docker build -t networking-hw .
remove:
	docker rmi networking-hw