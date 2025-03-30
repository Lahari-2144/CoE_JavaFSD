import 'package:flutter/material.dart';

class TranslatorPage extends StatelessWidget {
  final Function(Locale)? onLanguageChange;

  const TranslatorPage({super.key, this.onLanguageChange});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Translator")),
      body: Center(
        child: DropdownButton<Locale>(
          hint: Text("Select Language"),
          items: [
            DropdownMenuItem(value: Locale('en'), child: Text("English")),
            DropdownMenuItem(value: Locale('es'), child: Text("Spanish")),
            DropdownMenuItem(value: Locale('fr'), child: Text("French")),
          ],
          onChanged: (Locale? newLocale) {
            if (newLocale != null && onLanguageChange != null) {
              onLanguageChange!(newLocale);
            }
          },
        ),
      ),
    );
  }
}
