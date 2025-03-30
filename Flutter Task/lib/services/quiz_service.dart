import 'dart:convert';
import 'package:http/http.dart' as http;

class QuizService {
  static Future<List<Map<String, dynamic>>> fetchQuestions({String category = "general"}) async {
    String categoryUrl = "";
    if (category == "history") {
      categoryUrl = "https://opentdb.com/api.php?amount=10&category=23&type=multiple";
    } else if (category == "entertainment") {
      categoryUrl = "https://opentdb.com/api.php?amount=10&category=11&type=multiple";
    } else {
      categoryUrl = "https://opentdb.com/api.php?amount=10&type=multiple";
    }

    final response = await http.get(Uri.parse(categoryUrl));

    if (response.statusCode == 200) {
      final data = json.decode(response.body);
      return data['results'].map<Map<String, dynamic>>((question) {
        return {
          'question': question['question'],
          'correct_answer': question['correct_answer'],
          'answers': List<String>.from(question['incorrect_answers'])
            ..add(question['correct_answer'])
            ..shuffle(),
        };
      }).toList();
    } else {
      throw Exception('Failed to load quiz data');
    }
  }
}
