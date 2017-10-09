URL=`up url`

for i in $(seq 1 15)
do
  curl -X POST --data-binary '{}' "$URL/delay?t=3&id=$i"
  echo
done
