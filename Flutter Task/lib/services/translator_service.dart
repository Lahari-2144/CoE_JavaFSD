import 'dart:convert';
import 'package:http/http.dart' as http;

class TranslatorService {
  final String apiUrl = "https://libretranslate.com/translate";

  Future<String> translateText(String text, String targetLang) async {
    try {
      final response = await http.post(
        Uri.parse(apiUrl),
        headers: {"Content-Type": "application/json"},
        body: jsonEncode({
          "q": text,
          "source": "auto",
          "target": targetLang,
          "format": "text"
        }),
      );

      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        return data['translatedText'];
      } else {
        throw Exception("Translation failed");
      }
    } catch (e) {
      throw Exception("Error in translation: $e");
    }
  }
}
