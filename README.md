<h1> HomeHospital</h1>


[Home Hospital Wiki](../../wiki)


<h1>Run Application with Docker</h1>
Run the following command to run the application locally using docker. If using docker to run the application, you do not need to worry about the install instructions listed below. Docker takes care of packaging all of the dependencies. 

<pre><code>docker-compose up -d -build</code></pre>
<br>

<h1>Install Instructions </h1>

<pre><code>
# install backend dependencies
npm i --prefix ./HomeHospital-Backend/

# install frontend dependencies
npm i --prefix ./HomeHospital-Frontend/hh-front/

# install web scraper dependencies
npm i --prefix ./WebScraper/
</code></pre>


<h1>Run Application locally</h1>

To get the application running locally, you need to run each one of these commands in a different command shell. Start them in order, and then your web browser will open with the application. 
<pre><code>

# start backend
npm start --prefix ./HomeHospital-Backend/

# start Webscrapper
npm start --prefix ./WebScraper/

# start frontend
npm start --prefix ./HomeHospital-Frontend/hh-front/
</code></pre>
