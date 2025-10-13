const padString = number =>
  String(number).padStart(2, '0')

export const formatTime = time =>
  padString(Math.floor(time / 60)) + ':' + padString(Math.floor(time % 60))