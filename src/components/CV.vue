<template>
    <body>
    <div class="main-container">
        <div class="content-cv">
            <header id="cv">
                <h1>Marat Davletshin</h1>                
                <p><i class="fa fa-mars" aria-hidden="true"></i> Software Developer</p>
                <p><i class="fa fa-phone" aria-hidden="true"></i> +43 677 617 82 017</p>
                <p><i class="fa fa-address-card"></i> Wien Österreich</p>
                <p><i class="fa fa-envelope" aria-hidden="true"></i> davletshin081180@gmail.com</p>
                <p><a href=" github.com/nexoc"> www.github</a></p>                
            </header>
            <section class="section" id="cv">
                <h2>Über mich:</h2>
                <p>
                    Ich habe einen Hintergrund in Informationstechnologie mit Schwerpunkt auf Backend-Entwicklung.
                    Ich bin der Typ Mensch, der jede Gelegenheit nutzt, etwas Neues zu lernen.
                </p>
            </section>
        </div>

        <div class="photo-container">
            <img class="photo"  alt="photo" src="../assets/photo.jpg" width="350" height="420">
        </div>

    </div>

    <section class="section">
        <h2 id="tech-skills-title">Tech skills:</h2>
<table id="tech-skills-table">
    <tr>
        <th id="category-header">Category</th>
        <th id="skills-header">Skills</th>
    </tr>
    <tr>
        <td id="frontend-category">Frontend</td>
        <td id="frontend-skills">
            <ul id="frontend-skills-list">
                <li id="frontend-html">HTML</li>
                <li id="frontend-css">CSS</li>
                <li id="frontend-js">JS (VueJS)</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td id="backend-category">Backend</td>
        <td id="backend-skills">
            <ul id="backend-skills-list">
                <li id="backend-java">Java
                    <ul id="java-skills-list">
                        <li id="spring-core">Spring Core, Maven, Lombok, JDBC API, JDBC Template</li>
                        <li id="spring-mvc">Spring MVC, Spring Data JPA, Hibernate, Spring Boot</li>
                        <li id="rest-api">REST API using Spring Boot</li>
                        <li id="spring-security">Spring Security with JWT, CORS, CSRF</li>
                    </ul>
                </li>
                <li id="backend-python">Python: Django</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td id="sql-category">SQL</td>
        <td id="sql-skills">
            <ul id="sql-skills-list">
                <li id="sql-databases">PostgreSQL, SQLite, H2</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td id="devops-category">DevOps</td>
        <td id="devops-skills">
            <ul id="devops-skills-list">
                <li id="linux-admin">Linux System Administrator on Debian, Ubuntu</li>
                <li id="docker">Docker, Docker Compose</li>
                <li id="nginx">Nginx</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td id="other-category">Others</td>
        <td id="other-skills">
            <ul id="other-skills-list">
                <li id="git">Git</li>
                <li id="ms-office">MS-Office</li>
            </ul>
        </td>
    </tr>
</table>

    </section>

    <section class="section">
        <h2>Bildung und Qualifikationen:</h2>
        <ul>
            <li>2020 – 10.2023: HTL TGM Kolleg für Wirtschaftsingenieure – Betriebsinformatik Wien</li>
            <li><strong>Diplomarbeit:</strong> Entwicklung eines naturwissenschaftlichen Lernprogramms für die HTL unter Verwendung von Python, mit Schwerpunkt auf Mathematik. Umgesetzt mithilfe von Python, PyQt5 und matplotlib, einschließlich der Integration von matplotlib.animation für eine interaktive Lernerfahrung.</li>
            <li>2002-2004: Russische Akademie für Theaterkunst RATI, Staatliches Institut für Theaterkunst, Moskau, Russland</li>
            <li>1997-2000: Das Bolschoi Theater Ballett Academy, Berufsbildende Schule mit Matura, Moskau</li>
        </ul>
    </section>

    <section class="section">
        <h2>Sprachen:</h2>
        <p>Deutsch C1 </p>
        <p> Russisch Muttersprache </p>
        <p> Englisch B2</p>
    </section>

    <section class="section">
        <h2>Erfahrung</h2>       
        <ul>
            <li>06.2022 - 08.2022: Software Entwickler Praktikant, Berlin, Deutschland, Digital.Wolff, Plötz & Co GmbH</li>
            <li>Entwicklung eines Python-Mikroservices zur Datentransformation von JSON-Dateien in eine Postgresql-Datenbank. Implementierung verschiedener Zugriffsrechte (Admin, Moderator, Mitarbeiter) für gespeicherte Daten wie Fotos, Videos, Geolokation und Zeit. Administration der Postgresql-Datenbank. Frontend-Programmierung in JavaScript (Vue) für eine webbasierte Version zur Erfassung und Übermittlung von Fotos, Videos, Geolokationsdaten und Zeitstempeln auf den Server.</li>
        </ul>
        <ul>
            <li>2006-2020: Balletttänzer Wien, Österreich, Wiener Staatsoper</li>
            <li>2004-2006: Balletttänzer Leipzig, Deutschland, Leipziger Opernhaus</li>
            <li>2000-2004: Balletttänzer Moskau, Russland, Das Staatliche Akademische Theater des klassischen Balletts</li>
        </ul>
    </section>
    </body>
</template>

<style scoped>
body {
    font-family: Arial, sans-serif;
    line-height: 1.6;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}

.container {
    display: grid;
    grid-template-columns: 1fr auto; 
}

.photo {
    justify-self: end;
    margin-left: 10px;
}

h1, h2 {
    color: #333;
}
h2 {
    border-bottom: 1px solid #ccc;
    padding-bottom: 5px;
}
.section {
    margin-bottom: 20px;
}
.section p {
    margin: 0;
}
.section ul {
    margin-top: 5px;
    margin-bottom: 10px;
    padding-left: 20px;
}

#tech-skills-title {
    font-size: 24px;
    margin-bottom: 20px;
}

#tech-skills-table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
}

#tech-skills-table th, #tech-skills-table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
    vertical-align: top; 
}

#category-header {
    background-color: #7d7d7d; 
    color: white;
}

#skills-header {
    background-color: #7d7d7d; 
    color: white;
}

#tech-skills-table ul {
    list-style-type: disc;
    margin: 0;
    padding-left: 20px;
}

#tech-skills-table ul ul {
    list-style-type: circle;
    margin: 0;
    padding-left: 20px;
}

#tech-skills-table ul ul ul {
    list-style-type: square;
    margin: 0;
    padding-left: 20px;
}

#frontend-html, #frontend-css, #frontend-js,
#spring-core, #spring-mvc, #rest-api, #spring-security,
#sql-databases, #linux-admin, #docker, #nginx, 
#git, #ms-office {
    list-style-type: none;
}

</style>