#!/bin/sh

if [ "$#" -ne 1 ]; then
    echo "Uso: $0 arquivo.svg"
    exit 1
fi

if [ ! -f "$1" ]; then
    echo "Arquivo não encontrado: $1"
    exit 1
fi

sed -i'.original' -e 's/stroke="#1e1e1e"/stroke="var(--fonte)"/g' -e 's/fill="#1e1e1e"/fill="var(--fonte)"/g' "$1"

echo "Transformação concluída com sucesso."
