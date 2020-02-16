# Qantas

This is an UI based automation framework designed using Protractor, Type script and Cucumberjs for automating basicphp travels flight booking.

## Commands to execute:

1. git clone https://github.com/MookambikaKanawalli/qantas.git
2. yarn install

### Execute these 2 commands in a seperate terminal
1. yarn webdriver-manager update
2. yarn webdriver-manager start

### Open new terminal
1. yarn e2e (to run all tests)
2. yarn e2e:only (to run particular scenario)
3. yarn serenity:update
4. yarn serenity:run (to generate the report in {projectDirectory}/target/site/serenity folder)

### To run headless, 

#### add "--headless" under cucumberOptions in protractor.config.js file as shown below

capabilities: {
        browserName: "chrome",
        chromeOptions: {
            args: ["no-sandbox", "--disable-web-security", "--headless", "--disable-dev-shm-usage", "window-size=1200x1000"],
        },
    },
    
### Assumptions
1. Automated simple e2e scenario
2. Automated only one way trip
3. Default Billing address and payment details are used for automation
4. Currently supported on chrome browser only

### Automated Scenario
1. Successful flight book for "valid from" and "valid to" destinations for "one way" trip
2. Flight book for "invalid from" and "valid to" destinations for "one way" trip
3. Flight book for "valid from" and "invalid to" destinations for "one way" trip

### Scenario to be automated
1. Flight book for "round" trip 
2. CICD implementation
3. Containeization/Docker
    
