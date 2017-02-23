<?php

header('Content-Type: application/json');

require_once '../../php/globals.php';
require_once '../../php/config.inc.php';
require_once '../../php/jwt_util.php';
require_once '../../php/register.php';
require_once '../../php/login.php';
require_once '../../php/create_restaurant.php';

$request = htmlspecialchars($_POST['request']);

switch ($request) {
  case 'register':
    processRegisterRequest();
    break;
  case 'login':
    processLoginRequest();
    break;
  case 'create_restaurant':
    processCreateRestaurantRequest();
    break;
}

function processRegisterRequest() {
  $requestData = json_decode($_POST['data'], true);
  $name = ''; $email = ''; $password = ''; $password_confirmation = '';
  foreach ($requestData as $key => $value) {
    switch ($key) {
      case 'name':
        $name = htmlspecialchars($value);
        break;
      case 'email':
        $email = htmlspecialchars($value);
        break;
      case 'password':
        $password = htmlspecialchars($value);
        break;
      case 'password_confirmation':
        $password_confirmation = htmlspecialchars($value);
        break;
    }
  }
  echo json_encode(register($name, $email, $password, $password_confirmation));
}

function processLoginRequest() {
  $requestData = json_decode($_POST['data'], true);
  $email = '';
  $password = '';
  foreach ($requestData as $key => $value) {
    switch ($key) {
      case 'email':
        $email = htmlspecialchars($value);
        break;
      case 'password':
        $password = htmlspecialchars($value);
        break;
    }
  }

  # Sorry.
  $userDataGrabAttempt = getUserDataForJWT($email, $password);

  if ($userDataGrabAttempt['status'] != Status::SUCCESS) {
    echo json_encode($userDataGrabAttempt);
    return;
  }

  $result = ['status' => Status::SUCCESS];
  $userData = $userDataGrabAttempt['data'];
  $result['data'] = createJWT($userData['email'], $userData['name'],
                              $userData['category']);
  echo json_encode($result);
}

function processCreateRestaurantRequest() {
}