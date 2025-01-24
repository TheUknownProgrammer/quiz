
        const container_quiz = document.querySelector(".quiz");
        const radio_btn = container_quiz.querySelectorAll("input[type='radio']");
        const labels = container_quiz.getElementsByTagName("label");
        const question_El = document.getElementById("question_El");
        const submit_btn = document.getElementById("submit_quizBtn");
        const end_screen_El = document.getElementById("end_screen");
        const score_precent_El = document.getElementById("score_precent");
        const user_answers_end = document.getElementById("user_answers");
        const start_game_btn = document.getElementById("start_game");
        const start_menu = document.getElementById("start_menu");
        const question_numberEl = document.getElementById("question_number");
        const span_positions = question_numberEl.getElementsByTagName("span");
        const radio_choice = document.getElementById("radio_choice");
        const backMenu_Btn = document.getElementById("back-menu");
        const result_el = document.getElementById("result_game")

        var question_number = 0;
        var score = 0;
        let answerArr = [];
        let topic_name = "";
        let currTopicArr = [];
        var index_radio = null;

        const allCorrectGreeting = [
            "Good Job!",
            "Well Done!",
            "Prefection!",
            "Nice!",
            "Awesome! Congrats!"
        ];

        const questions_list = {
            countries: [
                {
                    question: "what is the smallest country in the world?",
                    options: ["Monaco", "Nauru", "Vatican city", "San Marino"],
                    correct_index: 2
                },
                {
                    question: "Which language has the more native speakers",
                    options: ["english", "spanish", "arabic", "French"],
                    correct_index: 1
                },
                {
                    question: "How many time zones are there in Russia?",
                    options: ["6", "14", "11", "4"],
                    correct_index: 2
                },
                {
                    question: "in what country there is no capital city?",
                    options: ["portugal", "austria", "venezuela", "nauru"],
                    correct_index: 3
                },
                {
                    question: "what is the poorest country in the world?",
                    options: ["afganistan", "south africa", "Burundi", "pakistan"],
                    correct_index: 2
                }
            ],
            animals: [
                {
                    question: "what is the biggest bird in earth?",
                    options: ["bold eagle", "ostrich", "cassowary", "emu"],
                    correct_index: 1
                },
                {
                    question: "The age of a lion can be determined by its…?",
                    options: ["nose", "tail", "body", "head"],
                    correct_index: 0
                },
                {
                    question: "What is the smallest mammal in the world?",
                    options: ["mokeys", "Bumblebee bat", "rats", "rabbits"],
                    correct_index: 1
                },
                {
                    question: "How far away can a wolf smell its prey?",
                    options: ["1 mile", "600 meters", "2 miles", "1.6 kilometers"],
                    correct_index: 2
                },
                {
                    question: "How many teeths can a crocodile have over its lifetime?",
                    options: ["600", "1200", "200", "4000"],
                    correct_index: 3
                }
            ],
            astronomy: [
                {
                    question: "How many days does it take for the Earth to orbit the Sun?",
                    options: ["345 days", "200 days", "170 days", "365 days"],
                    correct_index: 3
                },
                {
                    question: "Which is the second planet from the sun?",
                    options: ["earth", "mercury", "jupiter", "venus"],
                    correct_index: 3
                },
                {
                    question: "Phobos and Diemos are the moons of which planet in our solar system?",
                    options: ["pluto", "Mars", "the sun", "Saturn"],
                    correct_index: 1
                },
                {
                    question: "Which is the fastest rotating planet in our solar system?",
                    options: ["jupiter", "earth", "uranus", "Neptune"],
                    correct_index: 0
                },
                {
                    question: "Which planet in our solar system has a year which lasts around 84 Earth years?",
                    options: ["Mercury", "Saturn", "Uranus", "mars"],
                    correct_index: 2
                }
            ],
            super_heros: [
                {
                    question: "from what planet superman came from?",
                    options: ["krypton", "Kepler-452b", "Gacrux", "Betelgeuse"],
                    correct_index: 0
                },
                {
                    question: "what is the secret identity of batman?",
                    options: ["peter parker", "Bruce Banner", "clark kent", "bruce wayne"],
                    correct_index: 3
                }
            ]
        }

        function setup() {
            for (let i = 0; i < radio_btn.length; i++) {
                radio_btn[i].addEventListener("click", getIndexRadio);
            }
            for (item in questions_list) {
                let radio = document.createElement("input");
                let label = document.createElement("label");
    
                if (item.includes("_")) {
                    let fullItem = item.replaceAll("_", " ");
                    label.textContent = fullItem;
                } else {
                    label.textContent = item;
                }
    
                radio.setAttribute("type", "radio");
                radio.setAttribute("value", item);
                radio.setAttribute("name", `user_choice`);
                radio.id = `user_choice_${item}`;
                label.setAttribute("for", `user_choice_${item}`);
                radio_choice.append(radio, label);
            }
            submit_btn.addEventListener("click", submitAnswer);
            start_game_btn.addEventListener("click", startGame);
            backMenu_Btn.addEventListener("click", backMenu)
        }

        function getIndexRadio(e) {
            index_radio = parseInt(this.getAttribute("data-select"));
        }
        function PrintQuestion() {
            for (let i = 0; i < labels.length; i++) {
                labels[i].textContent = currTopicArr[question_number].options[i];
            }
            question_El.textContent = currTopicArr[question_number].question;
            span_positions[0].textContent = question_number;
        }

        function submitAnswer() {
            if (index_radio != null) {
                let user_choice = currTopicArr[question_number].options[index_radio];
                let correct_answer = currTopicArr[question_number].options[currTopicArr[question_number].correct_index];
                answerArr.push([user_choice, index_radio]);
                console.log(answerArr);
                console.log(`The User Select: ${user_choice}\nThe Correct Answer Is: ${correct_answer}`);
                radio_btn[index_radio].checked = false;
                if (user_choice == correct_answer) {
                    score++;
                    console.log(score);
                }
                if (question_number < currTopicArr.length - 1) {
                    question_number++;
                    PrintQuestion();
                } else {
                    end();
                }
                index_radio = null;
            }
            else {
                alert("You didn't select any answer!");
            }
        }

        function end() {
            var precent = Math.ceil((score / currTopicArr.length) * 100);
            score_precent_El.textContent = `${precent}%`;
            container_quiz.style.display = "none";
            end_screen_El.style.display = "block";
            result_el.innerHTML = `You Manage To Answer <strong>${score}</strong> Correct Answers Out of ${currTopicArr.length} in <u>${topic_name}</u> quiz.`;
            if (precent == 100) {
                result_el.innerHTML += " " + allCorrectGreeting[Math.floor(Math.random() * allCorrectGreeting.length)];
            }
            for (let i = 0; i < currTopicArr.length; i++) {
                let Temp_Correct_index = currTopicArr[i].correct_index;
                let div = document.createElement("div");
                div.textContent = `question ${i + 1}. ${answerArr[i][0]}`;
                if (Temp_Correct_index == answerArr[i][1]) {
                    div.style.color = "green";
                } else {
                    div.style.color = "red";
                }
                user_answers_end.append(div);
            }
        }

        function startGame() {
            const radio_topics = Array.from(radio_choice.querySelectorAll("input[type='radio']"));
            var topic_radio = radio_topics.find((radio) => radio.checked);
            if (topic_radio != undefined) {
                topic_name = topic_radio.value;
                container_quiz.style.display = "block";
                start_menu.style.display = "none";
                currTopicArr = questions_list[topic_name];
                span_positions[1].textContent = currTopicArr.length;
                PrintQuestion();
                topic_radio.checked = false;
            } else {
                alert("You Must To Select A Topic First To Start The Quiz!");
            }
        }

        function backMenu() {
            end_screen_El.style.display = "none";
            start_menu.style.display = "block";
            user_answers_end.textContent = "";
            question_number = 0;
            score = 0;
            answerArr = [];
            topic_name = "";
            currTopicArr = [];
        }
    setup();