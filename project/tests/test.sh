
goal app call \
    --app-id 1 \
    -f IZ5JBGQQZMBYVE53DNVOFG56AGDOO4625QRXJDCCYIGNHWYZ27LIPHA6ZM \
    --app-account NROZKKM4C3HESNNEBNAEPOKDQKKN7KAL2Z6MDLS5GSYAYLYEG7I6FU3DFI \
    --app-arg "str:start" \
    --app-arg "str:70" \
    --app-arg "str:30" \
    --app-arg "str:100" \
    -o play-start.tx

goal clerk send \
    -a 100000 \
    -t WCS6TVPJRBSARHLN2326LRU5BYVJZUKI2VJ53CAWKYYHDE455ZGKANWMGM \
    -f IZ5JBGQQZMBYVE53DNVOFG56AGDOO4625QRXJDCCYIGNHWYZ27LIPHA6ZM \
    -o play-wager.tx

cat play-start.tx play-wager.tx > play-combined.tx
goal clerk group -i play-combined.tx -o play-grouped.tx
goal clerk split -i play-grouped.tx -o play-split.tx

goal clerk sign -i play-split-0.tx -o play-signed-0.tx
goal clerk sign -i play-split-1.tx -o play-signed-1.tx

cat play-signed-0.tx play-signed-1.tx > play-signed-final.tx

goal clerk rawsend -f play-signed-final.tx