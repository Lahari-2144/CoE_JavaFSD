import 'package:flutter/material.dart';
import 'package:http/io_client.dart';
import 'dart:convert';
import 'dart:io';
import 'dart:async';

class WeatherPage extends StatefulWidget {
  @override
  _WeatherPageState createState() => _WeatherPageState();
}

class _WeatherPageState extends State<WeatherPage> {
  String? _city; // Initially null for "Select City"
  String _weather = '';
  bool _isWeatherVisible = false;

  final List<String> _cities = [
    'London', 'New York', 'Tokyo', 'Paris', 'Berlin', 'Moscow', 'Sydney',
    'Toronto', 'Dubai', 'Singapore', 'Hong Kong', 'Bangkok', 'Rome',
    'Istanbul', 'Los Angeles', 'Chicago', 'Mumbai', 'Beijing', 'Seoul', 'Madrid',
    'Chennai', 'Hyderabad', 'Bangalore', 'Vizag', 'Kolkata', 'Orissa', 
    'Pune', 'Coimbatore', 'Tirupati' , 'Nellore'
  ];

  Future<void> _fetchWeather() async {
    if (_city == null) return; // Ensure city is selected before fetching

    final httpClient = HttpClient()
      ..badCertificateCallback = (X509Certificate cert, String host, int port) => true;
    final ioClient = IOClient(httpClient);

    final response = await ioClient.get(
      Uri.parse('http://api.weatherapi.com/v1/current.json?key=02cdc910581249f997d70517252603&q=$_city&aqi=no'),
    );

    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);
      setState(() {
        _weather = 'City: ${data['location']['name']}\n'
                   'Temperature: ${data['current']['temp_c']}°C\n'
                   'Condition: ${data['current']['condition']['text']}\n'
                   'Humidity: ${data['current']['humidity']}%\n'
                   'Wind: ${data['current']['wind_kph']} kph';
        _isWeatherVisible = true;
      });
    } else {
      throw Exception('Failed to load weather');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Weather Info')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: <Widget>[
            // City Dropdown with "Select City" Placeholder
            DropdownButton<String>(
              hint: Text("Select City"),
              value: _city,
              isExpanded: true,
              onChanged: (String? newValue) {
                setState(() {
                  _city = newValue;
                });
              },
              items: _cities.map<DropdownMenuItem<String>>((String value) {
                return DropdownMenuItem<String>(
                  value: value,
                  child: Text(value),
                );
              }).toList(),
            ),
            SizedBox(height: 20),

            // "Check Weather" Button (Disabled if no city is selected)
            ElevatedButton(
              onPressed: _city == null ? null : _fetchWeather,
              child: Text('Weather info'),
            ),
            SizedBox(height: 20),

            // Weather Info (Only visible after clicking "Check Weather")
            if (_isWeatherVisible) ...[
              Text(
                _weather,
                style: TextStyle(fontSize: 18),
                textAlign: TextAlign.center,
              ),
            ],
          ],
        ),
      ),
    );
  }
}
