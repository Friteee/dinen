<?php

function create_confirmation($uid, $name, $email){

  $db_host = 'dinen.ddns.net';
  $db_user = 'teamdinen';
  $db_pass = 'dinenx3';
  $db_name = 'dinen';
  $mysqli = new mysqli($db_host, $db_user, $db_pass, $db_name);

  $action = array();
  $action['result'] = null;
  $text = array();

  if(empty($uid)){
    $action['result'] = 'error';
    array_push($text,'Missing UID.');
  }
  if(empty($name)){
    $action['result'] = 'error';
    array_push($text,'Missing name.');
  }
  if(empty($email)){
    $action['result'] = 'error';
    array_push($text,'Missing email.');
  }


  if($action['result'] != 'error'){
    $key = md5($name.$email);
  } else {
    return var_dump($text);
  }

  $action['text'] = $text;

  if ($mysqli->connect_error)
    return 'Database connection failed at confirm.';
  $stmt = $mysqli->prepare("INSERT INTO `confirm` (`user_id`, `key`) VALUES ($uid, '$key')");

  if ($stmt === FALSE) {
      die($mysqli->error);
  }
  $stmt->execute();

  if ($stmt->errno != 0)
    return 'Failed to create user.';

  return 'success';
}
?>