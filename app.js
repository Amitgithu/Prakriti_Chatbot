const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");

let userMessage = null; 
let questionIndex = 0;


let dosha = ["Pitta","Vata","Kapha"];



selected_value = [];

const questionsData = [
    {
      "question": "How much do you usually sleep?",
      "options": ["Around 6-8 hrs", "More than 6 hrs", "Less than 4 hrs", "Variable"]
    },
    {
      "question": "Is your skin Dry/Cracked?",
      "options": ["No, Its Oily.", "Yes, Dry/Cracked"]
    },
    {
      "question": "How is your Clarity of thoughts?",
      "options": ["I am Mostly Confused", "Mild", "Great Clarity of Thoughts"]
    },
    {
      "question": "What is your friends retaining quality?",
      "options": ["Medium", "Poor", "Good"]
    },
    {
      "question": "Do you like music excessively?",
      "options": ["Yes","No"]
    },
    {
      "question": "Tell me about your hair Growth?",
      "options": ["Moderate", "Scanty", "Dense"]
    },
    {
      "question": "What is your Hair Type?",
      "options": ["Thin", "Thick"]
    },
    {
      "question": "What is your body frame breadth?",
      "options": ["Thin/Narrow", "Broad", "Medium"]
    },
    {
      "question": "What is your body frame length?",
      "options": ["Long", "Medium", "Tooshort/Toolong"]
    },
    {
      "question": "What is your preference for warm environments?",
      "options": ["Like Warm", "Do Not Like Warm"]
    },
    {
      "question": "What is your walking speed?",
      "options": ["Quick/Fast/Brisk", "Medium", "Slow", "Variable"]
    },
    {
      "question": "What is your appetite amount?",
      "options": ["Low", "Medium", "High", "Variable"]
    },
    {
      "question": "Do you like sweet food stuffs?",
      "options": ["Yes, a lot", "Its Normal"]
    }
  ];
  

const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", `${className}`);
    let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi; 
}

const generateResponse = () => {
    const questionData = questionsData[questionIndex];
    const question = questionData.question;
    const options = questionData.options;

    const incomingChatLi = createChatLi(question, "incoming");
    const optionContainer = document.createElement("div");
    optionContainer.classList.add("chatbox-option-container");
    
    options.forEach((option, index) => {
        const optionElement = document.createElement("span");
        optionElement.classList.add("option");
        optionElement.textContent = option;
        optionElement.addEventListener("click", () => handleOptionClick(option, index));
        optionContainer.appendChild(optionElement);
    });

    incomingChatLi.querySelector("p").appendChild(optionContainer);
    chatbox.appendChild(incomingChatLi);
    
    chatbox.scrollTo(0, chatbox.scrollHeight);
}

const handleOptionClick = (option, optionIndex) => {
    const selectedOption = questionsData[questionIndex].options[optionIndex];
    selected_value.push(questionsData[questionIndex].options[optionIndex]);
    console.log(selected_value);
    userMessage = `Selected option: ${selectedOption}`;
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);

    if (questionIndex < questionsData.length - 1) {
        questionIndex++;
        generateResponse();
    } else {
        // End of questions, show a final message or result
        let index = Math.floor(Math.random()*3);
        chatbox.appendChild(createChatLi(`Thank you for answering the questions!, Yours Prakriti is ${dosha[index]}`));
        chatbox.scrollTo(0, chatbox.scrollHeight);
    }
}

const handleChat = () => {
    userMessage = chatInput.value.trim(); 
    if(!userMessage) return;

    chatInput.value = "";
    chatInput.style.height = "55px";

    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);

    setTimeout(() => {
        const incomingChatLi = createChatLi("Thinking...", "incoming");
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        generateResponse();
    }, 600);
}

chatInput.addEventListener("input", () => {
    chatInput.style.height = "55px";
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
    if(e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
    }
});

sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));

// Initial message
setTimeout(generateResponse, 1600);
