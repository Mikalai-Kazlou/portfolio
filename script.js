import projects from "./modules/projects.js";

function fillProject(uiProject, project) {
  let uiElement;

  const loadImage = (src, alt, uiImage) => {
    const image = new Image();
    image.src = src;
    image.onload = () => {
      uiImage.setAttribute("src", src);
      uiImage.setAttribute("alt", alt);
    };
    image.onerror = () => {
      setTimeout(() => loadImage(src, alt, uiImage), 1000);
    };
  };

  const getClassName = (element) => {
    return `.project__${element}`;
  }

  const uiImage = uiProject.querySelector(getClassName("image"));
  loadImage(project.image, project.title, uiImage);

  uiElement = uiProject.querySelector(getClassName("title"));
  uiElement.textContent = project.title;

  uiElement = uiProject.querySelector(getClassName("link"));
  uiElement.href = project.link;

  uiElement = uiProject.querySelector(getClassName("text"));
  uiElement.innerHTML = project.description;
}

function fillProjects() {
  const uiTemplate = document.querySelector("#project-template");
  const uiFragment = document.createDocumentFragment();

  projects.forEach((project) => {
    const uiProject = uiTemplate.content.cloneNode(true);
    fillProject(uiProject, project);
    uiFragment.append(uiProject);
  });

  const uiProjects = document.querySelector(".projects");
  uiProjects.append(uiFragment);
}

fillProjects();