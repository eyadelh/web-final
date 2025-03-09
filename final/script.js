document.addEventListener("DOMContentLoaded", function () {
    
    let data = { internet_in_japan: [] };

    const render = (source) => {
        const template = Handlebars.compile(source);
        const html = template(data);
        document.getElementById('content').innerHTML = html;
    };
    fetch("template.html")
    .then(response => response.text())
    .then(template => {
        render(template);
    
    fetch("internet.json")
    .then(response => response.json())
    .then(data => {
        const source = `
            <section class="timeline-section">
                    <h1 class="timeline-title">Japan's Internet Evolution</h1>
                    <div class="timeline">
                        {{#each internet_in_japan}}
                            <div class="timeline-item">
                                <h2>{{year}} - {{title}}</h2>
                                <p>{{description}}</p>
                            </div>
                        {{/each}}
                    </div>
                </section>
            `;
            
        const template = Handlebars.compile(source);
        document.getElementById("content").innerHTML = template(data);
    })
        .catch(error => console.error("Error loading JSON:", error));
    });
});
