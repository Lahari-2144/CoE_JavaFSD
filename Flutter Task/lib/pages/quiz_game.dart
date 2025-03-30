import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import '../services/quiz_service.dart';

class QuizGame extends StatefulWidget {
  final String category;

  const QuizGame({super.key, required this.category});

  @override
  _QuizGameState createState() => _QuizGameState();
}

class _QuizGameState extends State<QuizGame> {
  List<Map<String, dynamic>> _questions = [];
  int _currentQuestionIndex = 0;
  int _score = 0;
  bool _answered = false;
  String? _selectedAnswer;
  String? _correctAnswer;
  String _userName = ''; // Store the user's name
  bool _quizStarted = false; // Check if quiz started

  @override
  void initState() {
    super.initState();
    _loadQuestions();
  }

  Future<void> _loadQuestions() async {
    _questions = await QuizService.fetchQuestions(category: widget.category);
    setState(() {});
  }

  void _checkAnswer(String selectedAnswer) {
    if (_answered) return;

    setState(() {
      _answered = true;
      _selectedAnswer = selectedAnswer;
      _correctAnswer = _questions[_currentQuestionIndex]['correct_answer'];

      if (_selectedAnswer == _correctAnswer) {
        _score += 10;
      }
    });

    Future.delayed(const Duration(seconds: 1), () {
      if (_currentQuestionIndex < _questions.length - 1) {
        setState(() {
          _currentQuestionIndex++;
          _answered = false;
          _selectedAnswer = null;
          _correctAnswer = null;
        });
      } else {
        _saveScoreToFirebase();
      }
    });
  }

  Future<void> _saveScoreToFirebase() async {
    if (_userName.isNotEmpty) {
      await FirebaseFirestore.instance.collection('quiz_scores').add({
        'name': _userName,
        'score': _score,
        'category': widget.category,
        'timestamp': Timestamp.now(),
      });
    }

    _showScoreDialog();
  }

  void _showScoreDialog() {
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (context) => AlertDialog(
        title: const Text("Quiz Completed!"),
        content: Text("Your final score: $_score"),
        actions: [
          TextButton(
            onPressed: () {
              Navigator.pop(context);
              setState(() {
                _quizStarted = false;
                _score = 0;
                _currentQuestionIndex = 0;
              });
            },
            child: const Text("Restart Quiz"),
          ),
          TextButton(
            onPressed: () {
              Navigator.pop(context);
              Navigator.pop(context);
            },
            child: const Text("Back to Categories"),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    if (!_quizStarted) {
      return Scaffold(
        appBar: AppBar(title: Text("${widget.category} Quiz")),
        body: Center(
          child: Padding(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const Text(
                  "Enter Your Name",
                  style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                ),
                TextField(
                  onChanged: (value) => _userName = value,
                  decoration: const InputDecoration(
                    border: OutlineInputBorder(),
                    hintText: "Your Name",
                  ),
                ),
                const SizedBox(height: 15),
                ElevatedButton(
                  onPressed: () {
                    if (_userName.isNotEmpty) {
                      setState(() {
                        _quizStarted = true;
                      });
                    }
                  },
                  child: const Text("Start Quiz"),
                ),
              ],
            ),
          ),
        ),
      );
    }

    if (_questions.isEmpty) {
      return const Scaffold(body: Center(child: CircularProgressIndicator()));
    }

    final question = _questions[_currentQuestionIndex];
    final answers = List<String>.from(question['answers']);

    return Scaffold(
      appBar: AppBar(title: Text("${widget.category} Quiz")),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              question['question'],
              style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 20),
            ...answers.map((answer) {
              Color buttonColor = Colors.blue;
              if (_answered) {
                if (answer == _correctAnswer) {
                  buttonColor = Colors.green; // Correct answer
                } else if (answer == _selectedAnswer) {
                  buttonColor = Colors.red; // Wrong answer
                } else {
                  buttonColor = Colors.grey; // Unselected
                }
              }

              return Padding(
                padding: const EdgeInsets.symmetric(vertical: 5.0),
                child: ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: buttonColor,
                    padding: const EdgeInsets.all(15),
                  ),
                  onPressed: _answered ? null : () => _checkAnswer(answer),
                  child: Text(answer, style: const TextStyle(color: Colors.white)),
                ),
              );
            }),
          ],
        ),
      ),
    );
  }
}
