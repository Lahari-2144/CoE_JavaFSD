import 'package:flutter/material.dart';

class TappingGame extends StatefulWidget {
  const TappingGame({super.key});

  @override
  _TappingGameState createState() => _TappingGameState();
}

class _TappingGameState extends State<TappingGame> {
  int _score = 0;

  void _incrementScore() {
    setState(() {
      _score++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Tapping Game")),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text("Score: $_score", style: Theme.of(context).textTheme.bodyLarge),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: _incrementScore,
              style: ElevatedButton.styleFrom(padding: const EdgeInsets.all(20)),
              child: const Text("Tap Me!", style: TextStyle(fontSize: 20)),
            ),
          ],
        ),
      ),
    );
  }
}
