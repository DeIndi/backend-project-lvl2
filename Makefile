lint:
	npx eslint .
install:
	npm install
test:
	npx jest
test_coverage:
	npm test -s -- --coverage --coverageProvider=v8
link:
	npm link
