const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Knowledge Base for Rahul Mittal
const botData = {
    greeting: "Hi there! I'm Rahul's AI assistant. How can I help you today?",
    about: "Rahul is a 3rd-year Engineering student passionate about turning complex problems into simple, functional code. He specializes in Python, C++, and Web Development.",
    skills: "Rahul is proficient in: \n• Languages: Python, C++, JavaScript, SQL\n• Web: React, Node.js, HTML5/CSS3\n• Tools: Git, Linux, Figma.",
    projects: "Rahul has built over 10 projects, including a Portfolio Case Study, a Task Management App, and various Python Automation tools. You can see them in the 'Projects' section!",
    education: "He is currently pursuing a B.Tech in Engineering (3rd Year), focusing on Computer Science fundamentals and DSA.",
    contact: "You can reach Rahul at: 217455023+codingwithrahul965@users.noreply.github.com or find him on GitHub at github.com/codingwithrahul965",
    default: "I'm not sure about that. Try asking about Rahul's 'skills', 'projects', or 'how to contact' him!"
};

app.post('/api/chat', (req, res) => {
    const message = req.body.message.toLowerCase();
    let response = botData.default;

    if (message.includes('hi') || message.includes('hello')) response = botData.greeting;
    else if (message.includes('about') || message.includes('who')) response = botData.about;
    else if (message.includes('skill')) response = botData.skills;
    else if (message.includes('project')) response = botData.projects;
    else if (message.includes('education') || message.includes('study')) response = botData.education;
    else if (message.includes('contact') || message.includes('email')) response = botData.contact;

    res.json({ reply: response });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));