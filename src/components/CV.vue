<template>
<body> 
    <div class="main-container">
        <div class="content-cv">
            <header id="cv">
                <h1>Marat Davletshin</h1>
                <p>Software Developer</p>
            </header>
            <section class="section" id="cv">
                <h2>Über mich:</h2>
                <p>
                    Ich habe einen Hintergrund in Informationstechnologie mit Schwerpunkt auf Backend-Entwicklung.
                    Ich bin der Typ Mensch, der jede Gelegenheit nutzt, etwas Neues zu lernen. Deshalb liebe ich Herausforderungen.
                    Dadurch gerate ich unter Druck, schnell zu lernen und viele neue Erfahrungen zu sammeln.
                </p>
            </section>
        </div>

        <div class="photo-container">
            <img class="photo"  alt="photo" src="../assets/photo.jpg" width="270" height="330">
        </div>

    </div>

    <section class="section">
        <h2>Tech skills:</h2>
        <ul>
            <li>
                Frontend
                <ul> 
                    <li>
                        HTML
                    </li>
                    <li>
                        CSS
                    </li>
                    <li>
                        JS (VueJS)
                    </li>
                </ul>

            </li>

            <li>Backend
                <ul>
                    <li>
                        Java
                        <ul> 
                            <li>
                                Spring Core, Maven, Lombok,  JDBC API, JDBC Template 
                            </li>
                            <li>
                                Spring MVC, Spring Data JPA, Hibernate, Spring Boot
                            </li>
                            <li>
                                REST API using Spring Boot
                            </li>
                            <li>
                                Spring Security with JWT, CORS, CSRF
                            </li>
                        </ul>
                    </li>
                    <li>Python: Django</li>
                    
                </ul>
            </li>
            <li>
                SQL
                <ul>
                    <li>
                    PostgreSQL, Sqlite, H2
                    </li>
                </ul>
            </li>            
            <li>
                Devops
                <ul> 
                    <li>
                        Linux System Administrator on Debian, Ubuntu
                    </li>
                    <li>
                        Docker, Docker Compose
                    </li>
                    <li>
                        Ngnix
                    </li>
                </ul>
                    </li>
                
            <li>Sonstige
                <ul> 
                    <li>
                        Git
                    </li>
                    <li>
                        MS-Office
                    </li>
                </ul>
            </li>
        </ul>
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
</style>