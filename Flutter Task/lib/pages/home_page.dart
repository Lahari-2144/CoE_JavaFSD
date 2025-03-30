import 'package:flutter/material.dart';
import 'quiz_category_page.dart';
import 'translator.dart';
import 'tapping_game.dart';
import 'tic_tac_toe.dart';
import 'weatherpage.dart';
import 'latestnewspage.dart';

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.deepPurple,
        title: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Image.asset('assets/logo.jpg', height: 30), // Your logo
            const SizedBox(width: 10),
            const Text(
              "Timepass",
              style: TextStyle(
                fontSize: 22,
                fontWeight: FontWeight.bold,
                color: Colors.white,
              ),
            ),
          ],
        ),
        centerTitle: true,
      ),
      body: Container(
        width: double.infinity,
        padding: const EdgeInsets.all(20),
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            colors: [Colors.black, Colors.deepPurple], 
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
          ),
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            // App Logo & Name
            Image.asset('assets/logo.jpg', height: 100), // Adjust path if needed
            const SizedBox(height: 10),
            const Text(
              "Lazy? Then let's do something boring!",
              textAlign: TextAlign.center,
              style: TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.bold,
                color: Colors.white,
              ),
            ),
            const SizedBox(height: 30),

            // Buttons
            _buildStyledButton(context, "Quiz Game", QuizCategoryPage()),
            _buildStyledButton(context, "Tapping Game", TappingGame()),
            _buildStyledButton(context, "Translator", TranslatorPage(onLanguageChange: (Locale ) {  },)),
            _buildStyledButton(context, "Tic Tac Toe Game", TicTacToeGame()),
            _buildStyledButton(context, "Check Latest News", LatestNewsPage()),
            _buildStyledButton(context, "Check Weather", WeatherPage()),
          ],
        ),
      ),
    );
  }

  // Custom styled button
  Widget _buildStyledButton(BuildContext context, String text, Widget page) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8),
      child: SizedBox(
        width: 250,
        height: 50,
        child: ElevatedButton(
          onPressed: () {
            Navigator.push(
              context,
              MaterialPageRoute(builder: (context) => page),
            );
          },
          style: ElevatedButton.styleFrom(
            backgroundColor: Colors.deepPurpleAccent,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(20),
              side: const BorderSide(color: Colors.white, width: 2),
            ),
            elevation: 8,
          ),
          child: Text(
            text,
            style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.white),
          ),
        ),
      ),
    );
  }
}
