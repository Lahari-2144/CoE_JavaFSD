import 'package:flutter/material.dart';
import 'quiz_game.dart';
import '../widgets/custom_button.dart';

class QuizCategoryPage extends StatelessWidget {
  const QuizCategoryPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Select Quiz Category")),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            CustomButton(
              text: "General Knowledge",
              onPressed: () {
                Navigator.push(context, MaterialPageRoute(builder: (context) => const QuizGame(category: "general")));
              },
            ),
            CustomButton(
              text: "History",
              onPressed: () {
                Navigator.push(context, MaterialPageRoute(builder: (context) => const QuizGame(category: "history")));
              },
            ),
            CustomButton(
              text: "Entertainment",
              onPressed: () {
                Navigator.push(context, MaterialPageRoute(builder: (context) => const QuizGame(category: "entertainment")));
              },
            ),
          ],
        ),
      ),
    );
  }
}
