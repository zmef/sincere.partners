document.addEventListener('DOMContentLoaded', () => {
    const questions = document.querySelectorAll('.question-block');
    const nextBtn = document.getElementById('next-btn');
    const submitBtn = document.getElementById('submit-btn');
    const quizContainer = document.getElementById('quiz-container');
    const resultsContainer = document.getElementById('results-container');
    const scoreSpan = document.getElementById('score');
    const suggestionsUl = document.getElementById('suggestions');

    let currentQuestionIndex = 0;
    let score = 0;

    // --- All suggestions are stored here ---
    const allSuggestions = {
        q1: "Even a simple one-page website can help people trust you and find your services. Start with your name, a few sentences about what you do, and a way to contact you.",
        q2: "A Google Business Profile helps you show up in local searches even if you don't have a website. It's free, easy to set up, and lets people find your hours, services, and reviews quickly.",
        q3: "Having at least one active social media page helps people find and trust your business. Start with the platform your customers are already using (like Facebook or Instagram).",
        q4: "Consistency builds trust. Even posting just once a week can help people remember you. Start with 3-5 reusable posts, like an intro, a service spotlight, and a photo of your work, then rotate them.",
        q5: 'Try this formula: "I help [type of client] with [problem or service] so they can [result]." Even a rough version will help you speak more clearly about what you offer.',
        q6: "When someone lands on your site or page, they should quickly understand who you are and what you offer. A clear headline like 'Custom cakes in Metamora' makes a huge difference.",
        q7: "Trust builds slowly, but simple things like adding a recent photo, a kind review, or clear contact info can make your business feel more real, local, and approachable.",
        q9: "If you're not showing up on Google, you're missing out on potential customers. Setting up a Google Business Profile is the fastest way to get on the map.",
        q10: "Keywords are just the words your customers would search - like 'baker in Metamora'. Add these to your website headings, bio, or listing so people can find you more easily."
    };

    const suggestionsToShow = new Set();

    function showQuestion(index) {
        questions.forEach((question, i) => {
            question.classList.toggle('active', i === index);
        });

        if (index === questions.length - 1) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'inline-block';
        } else {
            nextBtn.style.display = 'inline-block';
            submitBtn.style.display = 'none';
        }
    }

    function processCurrentQuestionScore() {
        const currentQuestion = questions[currentQuestionIndex];
        const inputs = currentQuestion.querySelectorAll('input:checked');
        let questionPoints = 0;

        if (inputs.length > 0) {
             inputs.forEach(input => {
                questionPoints += parseFloat(input.value);
            });
        }
        score += questionPoints;

        // --- Logic for adding suggestions ---
        const qId = currentQuestion.dataset.questionId;

        // Website (Score less than 3)
        if (qId === '1' && questionPoints < 3) suggestionsToShow.add(allSuggestions.q1);
        // GMB (Score is 0)
        if (qId === '2' && questionPoints === 0) suggestionsToShow.add(allSuggestions.q2);
        // Social Media (Score is 0)
        if (qId === '3' && questionPoints === 0) suggestionsToShow.add(allSuggestions.q3);
        // Posting Frequency (Score is less than 2)
        if (qId === '4' && questionPoints < 2) suggestionsToShow.add(allSuggestions.q4);
        // Clarity (Score is 0)
        if (qId === '5' && questionPoints === 0) suggestionsToShow.add(allSuggestions.q5);
        // First Impression (Score is 0)
        if (qId === '6' && questionPoints === 0) suggestionsToShow.add(allSuggestions.q6);
        // Trust Signals (Score is 0)
        if (qId === '7' && questionPoints === 0) suggestionsToShow.add(allSuggestions.q7);
        // Search Presence (Score is 0)
        if (qId === '9' && questionPoints === 0) suggestionsToShow.add(allSuggestions.q9);
        // SEO Awareness (Score is less than 1)
        if (qId === '10' && questionPoints < 1) suggestionsToShow.add(allSuggestions.q10);
    }

    nextBtn.addEventListener('click', () => {
        processCurrentQuestionScore();
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion(currentQuestionIndex);
        }
    });

    submitBtn.addEventListener('click', () => {
        processCurrentQuestionScore();
        quizContainer.style.display = 'none';

        // Display results
        scoreSpan.textContent = score.toFixed(1);

        if (suggestionsToShow.size === 0) {
            const li = document.createElement('li');
            li.textContent = "Great job! Your online marketing presence is strong. Keep up the consistent effort.";
            suggestionsUl.appendChild(li);
        } else {
            suggestionsToShow.forEach(suggestionText => {
                const li = document.createElement('li');
                li.textContent = suggestionText;
                suggestionsUl.appendChild(li);
            });
        }

        resultsContainer.style.display = 'block';
    });

    // Show the first question initially
    showQuestion(0);
});
