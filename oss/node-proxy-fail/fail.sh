URL=`up url`
curl -s "$URL/delay?t=10&id=1"
echo
curl -s "$URL/delay?t=10&id=2"
echo
curl -s "$URL/delay?t=20&id=3"
echo
curl -s "$URL/delay?t=45&id=4"
echo
curl -s "$URL/delay?t=1&id=5"
echo
