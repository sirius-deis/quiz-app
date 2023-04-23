import "./categories";

const startSection = document.querySelector(".start");
const starterBtnEl = startSection.querySelector(".btn");
const infoSection = document.querySelector(".info");

const url = new URL(location);
let current = "";
let currentSection;

window.addEventListener("DOMContentLoaded", (e) => {
    const name = retrieveNameFromStorage();

    if (url.pathname !== "/" && !name) {
        currentSection = startSection;
        replace();
    }
    starterBtnEl &&
        starterBtnEl.addEventListener("click", () => {
            currentSection = infoSection;
            move("info");
            showSection(infoSection);
            hideSection(startSection);
        });
});

const replace = (path = "") => {
    history.replaceState(null, "", `${url.origin}/${path}`);
};

const move = (path) => {
    current = `${url.origin}/${path}`;
    history.pushState(null, "", current);
};

const showSection = (section) => {
    section.classList.remove("hidden");

    setTimeout(() => {
        section.classList.add(`visible`);
    }, 10);
};

const hideSection = (section) => {
    section.classList.remove("visible");
    setTimeout(() => {
        section.classList.add("hidden");
    }, 300);
};

const retrieveNameFromStorage = () => {
    return localStorage.getItem("name");
};

const putNameToStorage = (name) => {
    localStorage.setItem("name", name);
};

window.addEventListener("popstate", (e) => {
    const section = new URL(e.target.location).pathname.slice(1);
    if (section === current) {
        return;
    }
    const sectionToReplace = document.querySelector(`.${section || "start"}`);
    showSection(sectionToReplace);
    hideSection(currentSection);
    currentSection = sectionToReplace;
});
