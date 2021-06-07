# Virtual folders
Test project with NodeJS/TypeScript

## Requirements
The only requirements to deploy this project (besides internet access, of course) is installed containerization software.
- docker (https://www.docker.com, https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-20-04)
- docker-compose (https://docs.docker.com/compose, https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-20-04)

_Other used libraries and images are downloaded automaticaly on container deployment_.

## Build and run
```bash
# git clone https://github.com/cham3130n/test.git
# cd test/docker
# docker-compose up test
```

## Test
Test environment is built with ts-jest. Test files are placed in project's root folder and have names like *.test.ts
```bash
# Inside the container
docker-compose run test sh -c "cd service; npm t"

# If you have installed jest, ts-jest and @types/jest, you can try to run them directly
cd service
npm t
```

## Running without container
If one have already installed Node, it is possible to run built project from outside of a container. Script does nothing to the host system, neither creates any additional data. Transpiled code can be found in service/dist folder, so can be executed directly with Node. Main application file is **app.js**.

_But build stage still should be done inside container. Otherways, author cannot guarantee the result because of possible differences in environment_.
```bash
/service # cd dist
/service/dist # node app.js
CREATE fruits
CREATE vegetables
CREATE grains
CREATE fruits/apples
CREATE fruits/apples/fuji
LIST
fruits
 apples
  fuji
grains
vegetables
CREATE grains/squash
MOVE grains/squash vegetables
CREATE foods
MOVE grains foods
MOVE fruits foods
MOVE vegetables foods
LIST
foods
 fruits
  apples
   fuji
 grains
 vegetables
  squash
DELETE fruits/apples
Cannot delete fruits/apples - fruits does not exist
DELETE foods/fruits/apples
LIST
foods
 fruits
 grains
 vegetables
  squash
/service/dist # 
```
